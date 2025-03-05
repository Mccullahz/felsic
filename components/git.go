package components

import (
	"fmt"

	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing/transport/http"
)

func push(repoPath, remoteName, branchName, username, password string) error {
	repo, err := git.PlainOpen(repoPath)
	if err != nil {
		return err
	}
	err = repo.Push(&git.PushOptions{
		RemoteName: remoteName,
		RefSpecs:   []string{fmt.Sprintf("refs/heads/%s:refs/heads/%s", branchName, branchName)},
		Auth: &http.BasicAuth{
			Username: username,
			Password: password,
		},
	})
	if err != nil {
		return err
	}
	return nil
}

func pull(repoPath, remoteName, branchName, username, password string) error {
	repo, err := git.PlainOpen(repoPath)
	if err != nil {
		return err
	}
	wt, err := repo.Worktree()
	if err != nil {
		return err
	}
	err = wt.Pull(&git.PullOptions{
		RemoteName: remoteName,
		RefSpecs:   []string{fmt.Sprintf("refs/heads/%s:refs/remotes/%s/%s", branchName, remoteName, branchName)},
		Auth: &http.BasicAuth{
			Username: username,
			Password: password,
		},
	})
	if err != nil && err.Error() != "already up-to-date" {
		return err
	}
	return nil
}
