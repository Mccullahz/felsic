package main

import (
	"context"
	//"felsic-req/config" //also borked
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	// these are borked, should ensure config is loaded before wails app starts
	//cfg, err:= config.getConfig()
	//log.Println("Config loaded, database: ", config.appConfig.Database.URI)

	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}
