package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func logRequest(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Request: %s %s", r.Method, r.URL.Path)
		next(w, r)
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %s\n", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "6069"
	}

	fs := http.FileServer(http.Dir("./frontend/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	tmpl := http.FileServer(http.Dir("./frontend/templates"))
	http.Handle("/templates/", http.StripPrefix("/templates/", tmpl))

	http.HandleFunc("/", logRequest(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./frontend/index.html")
	}))

	log.Printf("Server listening on port %s\n", port)
	err = http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalf("Error starting server: %s\n", err)
	}
}
