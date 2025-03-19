package components

import (
	"log"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing/object"
	"github.com/go-git/go-git/v5/plumbing/transport/http"
)

// push commits and pushes ALL modified files to GitHub
func push(repoPath, username, token string) error {
	// read existing repo
	repo, err := git.PlainOpen(repoPath)
	if err != nil {
		return err
	}

	// get working directory
	w, err := repo.Worktree()
	if err != nil {
		return err
	}

	// stage all changes
	err = w.AddGlob("*")
	if err != nil {
		return err
	}

	// check for any changes to commit
	status, err := w.Status()
	if err != nil {
		return err
	}
	if status.IsClean() {
		log.Println("No changes to commit.")
		return nil
	}

	// commit changes
	commitMsg := "Felsic updated repository files"
	_, err = w.Commit(commitMsg, &git.CommitOptions{
		Author: &object.Signature{
			Name:  username,
			Email: username + "@users.noreply.github.com",
		},
	})
	if err != nil {
		return err
	}

	// push to GitHub
	auth := &http.BasicAuth{
		Username: username, // GitHub username (not used, but required)
		Password: token,    // GitHub personal access token
	}

	err = repo.Push(&git.PushOptions{
		Auth: auth,
	})
	if err != nil {
		return err
	}

	log.Println("Changes successfully pushed to GitHub")
	return nil
}

// pulls the latest changes from GitHub
func pull(repoPath, username, token string) error {
	// read existing repo
	repo, err := git.PlainOpen(repoPath)
	if err != nil {
		return err
	}

	// pull from GitHub
	auth := &http.BasicAuth{
		Username: username, // GitHub username (not used, but required)
		Password: token,    // GitHub personal access token
	}

	err = repo.Fetch(&git.FetchOptions{
		Auth: auth,
	})
	if err != nil {
		return err
	}

	log.Println("Changes successfully pulled from GitHub")
	return nil
}
