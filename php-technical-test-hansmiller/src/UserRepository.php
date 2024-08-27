<?php
namespace Administrator\PhpTechnicalTestHansmiller;

class UserRepository {
    private $users = [];

    // save a new User to the repository
    public function saveUser(User $user) {
        if ($this->findUserByUsername($user->getUsername())) {
            throw new \Exception("User already exists.");
        }
        $this->users[] = $user;
    }

    // Find a User by username
    public function findUserByUsername($username) {
        foreach ($this->users as $user) {
            if ($user->getUsername() === $username) {
                return $user;
            }
        }
        return null; // User not found
    }

    // Get all users
    public function getAllUsers() {
        return $this->users;
    }

    // Delete a User by username
    public function deleteUser($username) {
        foreach ($this->users as $index => $user) {
            if ($user->getUsername() === $username) {
                unset($this->users[$index]);
                $this->users = array_values($this->users); // Reindex array
                return;
            }
        }
        throw new \Exception("User not found for deletion.");
    }
    
}