<?php
namespace Administrator\PhpTechnicalTestHansmiller;
use PHPUnit\Framework\TestCase;

final class UserTest extends TestCase
{
    //Test Uer class construct
    public function testClassConstructor()
    {
        //initialize user
        $user = new User();
        $user->setUsername('Hans');
        $user->setEmail('hansmiller@gmail.com');

        //test user attribute
        $this->assertSame('Hans', $user->getUsername());
        $this->assertSame('hansmiller@gmail.com', $user->getEmail());
        $this->assertEmpty($user->getPassword());
    }

    //Test username set method
    public function testSetUsername() {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("Username must be between 3 and 20 characters long.");

        $user = new User();
        $user->setUsername("ab");
        $this->assertTrue($user->setUsername("abc"));
    }

    //Test email set method
    public function testSetEmail() {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("Email is not valid.");

        $user = new User();
        $user->setEmail("abc");
        $this->assertTrue($user->setEmail("hansmiller@gmail.com"));
    }

    //Test password set method
    public function testSetPassword() {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("Password must contain at least one uppercase letter.");

        $user = new User();
        $user->setPassword("abc12345");
        $this->assertTrue($user->setPassword("Abc12345"));
    }
}