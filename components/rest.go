// This file will contain the REST api for the backend, here we will get db files, and patch db files. should be ezpz
package components

import (
	"context"
	"log"
	// "time" // not currently using time, but will need for future development

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection

func connectMongo() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017") // adjust based on db.... Will setup a config file in the future to handle optioned vars
	client, err := mongo.Connect(context.TODO(), clientOptions) 
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB, please ensure database is active:", err)
	}


	collection = client.Database("mydb").Collection("files") // same thing here, get from optioned vars later
	log.Println("Successfully connected to MongoDB database")
}
