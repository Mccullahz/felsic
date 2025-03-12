package main

import (
	"log"
	"context"
	"felsic-req/config"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	// should ensure config is loaded before wails app starts
	cfg:= config.GetConfig()
		log.Println("Config loaded, database: ", cfg.Database.URI)
	
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}
