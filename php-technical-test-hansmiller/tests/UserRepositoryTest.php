<?php
namespace Administrator\PhpTechnicalTestHansmiller;
use PHPUnit\Framework\TestCase;

final class UserRepositoryTest extends TestCase
{
    private $userRepository;

    //set up user repository
    protected function setUp(): void {
        $this->userRepository = new UserRepository();
    }

    //test save user method for UserRepository
    public function testSaveUser()
    {
        $user = new User();
        $user->setUsername("Hans");

        $this->userRepository->saveUser($user);

        $this->assertEquals("Hans", $this->userRepository->findUserByUsername("Hans")->getUsername());
    }

    //test multiple save user error for UserRepository
    public function testSaveDuplicateUserThrowsException() {
        $user1 = new User();
        $user1->setUsername("Hans");
        $this->userRepository->saveUser($user1);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("User already exists.");

        $user2 = new User();
        $user2->setUsername("Hans");
        $this->userRepository->saveUser($user2);
    }

    //test multiple save user for UserRepository
    public function testSaveMultipleUsers() {
        $user1 = new User();
        $user1->setUsername("Hans");
        $user2 = new User();
        $user2->setUsername("Hand");

        $this->userRepository->saveUser($user1);
        $this->userRepository->saveUser($user2);

        $users = $this->userRepository->getAllUsers();
        $this->assertCount(2, $users);
        $this->assertEquals("Hans", $users[0]->getUsername());
        $this->assertEquals("Hand", $users[1]->getUsername());
    }
}