# Stage 1: Build dependencies
FROM golang:1.24.2 as deps

WORKDIR /build

# Cache go mod dependencies
COPY go.mod go.sum ./
RUN go mod download

FROM golang:1.24.2 as builder

WORKDIR /build

# Copy only go.mod/go.sum and downloaded deps first
COPY --from=deps /go/pkg /go/pkg
COPY --from=deps /go/bin /go/bin
COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o server server/cmd/main.go

# Stage 3: Minimal Alpine image
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/
COPY --from=builder /build/server ./