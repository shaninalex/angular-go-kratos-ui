package db

import (
	"log"
	"time"

	"github.com/shaninalex/angular-go-kratos-ui/server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDB(url string) *gorm.DB {
	var err error

	const maxRetries = 5
	const retryDelay = 5 * time.Second

	for i := 1; i <= maxRetries; i++ {
		gormDB, err := gorm.Open(postgres.Open(url), &gorm.Config{})
		if err != nil {
			log.Printf("[DB]: Connection attempt %d/%d failed to open: %v", i, maxRetries, err)
			time.Sleep(retryDelay)
			continue
		}

		sqlDB, err := gormDB.DB()
		if err != nil {
			log.Printf("[DB]: Connection attempt %d/%d sql db is not valid: %v", i, maxRetries, err)
			time.Sleep(retryDelay)
			continue
		}

		err = sqlDB.Ping()
		if err != nil {
			log.Printf("[DB]: Connection attempt %d/%d failed ping sql db: %v", i, maxRetries, err)
			time.Sleep(retryDelay)
			continue
		}

		sqlDB.SetMaxIdleConns(10)
		sqlDB.SetMaxOpenConns(100)
		sqlDB.SetConnMaxLifetime(time.Hour)
		ApplyMigrations(gormDB)
		return gormDB
	}

	log.Fatalf("[DB]: Failed to connect after %d attempts: %v", maxRetries, err)
	return nil
}

// ApplyMigrations applying migrations
func ApplyMigrations(db *gorm.DB) {
	err := db.AutoMigrate(
		&models.Note{},
	)
	if err != nil {
		log.Printf("[DB]: Unable to apply migrations: %v", err)
		panic(err)
	}
}
