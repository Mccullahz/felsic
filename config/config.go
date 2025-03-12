package config

import (
	"encoding/json"
	"log"
	"os"
)

type Config struct {
	Database struct {
		URI string `json:"uri"`
		Name string `json:"name"`
	} `json:"database"`
	Server struct {
		Port int `json:"port"`
	} `json:"server"`
}

var appConfig Config

// read and return the configuration from the config.json file
func getConfig() Config {
	var cfg Config

	file, err := os.ReadFile("config/config.json")
	if err != nil {
		log.Fatal("Failed to read configuration file:", err)
		return cfg// empty config
	}

	err = json.Unmarshal(file, &appConfig)
	if err != nil {
		log.Fatal("Failed to parse configuration file:", err)
		return cfg// empty config
	}

log.Println("Configuration loaded successfully")
return cfg // parsed config
}
