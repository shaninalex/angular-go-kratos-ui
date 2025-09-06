package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Note struct {
	ID uuid.UUID `gorm:"type:uuid;primaryKey"`

	UserID *uuid.UUID `gorm:"index"`

	Title string
	Body  string

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
