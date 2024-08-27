<?php
namespace Administrator\PhpTechnicalTestHansmiller;

class User {
    //Attributes
    private $username;
    private $email;
    private $password;

    //Constructor method
    public function __construct()
    {
    }

    // Getter for username
    public function getUsername() {
        return $this->username;
    }

    //Setter for username
    public function setUsername($username)
    {
        //Check if username validate
        $this->validateUsername($username);

        //throw exception and save attribute
        $this->username = $username;
    }

    // Getter for email
    public function getEmail() {
        return $this->email;
    }

    //Setter for email
    public function setEmail($email)
    {
        //Check if email validate
        $this->validateEmail($email);

        //throw exception and save attribute
        $this->email = $email;
    }

    // Getter for password
    public function getPassword() {
        return $this->password;
    }

    //Setter for password
    public function setPassword($password)
    {
        //Check if email validate
        $this->validatePassword($password);

        //throw exception and save attribute
        $this->password = $password;   
        //encrypte password eg $this->password = md5($password);
    }

    //Validate method for username
    public function validateUsername($username)
    {
        // Define the minimum and maximum length for the username
        $minLength = 3;
        $maxLength = 20;

        // Check if the username length is within the allowed range
        if (strlen($username) < $minLength || strlen($username) > $maxLength) {
            throw new \InvalidArgumentException("Username must be between $minLength and $maxLength characters long.");
        }

        // Check if the username contains only allowed characters (letters, numbers, and underscores)
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $username)) {
            throw new \InvalidArgumentException("Username can only contain letters, numbers, and underscores.");
        }
    }

    //Validate method for email
    public function validateEmail($email)
    {
        // Check if the email address is valid
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("Email is not valid.");
        }

        // Extract domain from email
        list($user, $domain) = explode('@', $email);

        // Check if the domain has an MX record
        if (!checkdnsrr($domain, 'MX')) {
            throw new \InvalidArgumentException("Domain does not have a valid MX record.");
        }
    }

    //Validate method for password
    public function validatePassword($password) {
        // Define validation rules
        $minLength = 8; // Minimum length for the password
        $hasUppercase = preg_match('/[A-Z]/', $password); // Check for at least one uppercase letter
        $hasLowercase = preg_match('/[a-z]/', $password); // Check for at least one lowercase letter
        $hasNumber = preg_match('/\d/', $password); // Check for at least one number
        $hasSpecialChar = preg_match('/[\W_]/', $password); // Check for at least one special character
    
        // Check password length
        if (strlen($password) < $minLength) {
            throw new \InvalidArgumentException("Password must be at least $minLength characters long.");
        }
    
        // Check for uppercase letter
        if (!$hasUppercase) {
            throw new \InvalidArgumentException("Password must contain at least one uppercase letter.");
        }
    
        // Check for lowercase letter
        if (!$hasLowercase) {
            throw new \InvalidArgumentException("Password must contain at least one lowercase letter.");
        }
    
        // Check for number
        if (!$hasNumber) {
            throw new \InvalidArgumentException("Password must contain at least one number.");
        }
    
        // Check for special character
        if (!$hasSpecialChar) {
            throw new \InvalidArgumentException("Password must contain at least one special character (e.g., @, #, $, %, &, *, etc.).");
        }
    }
    
}