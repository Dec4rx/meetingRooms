<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{   
    /*These Test can be used once with the user created in testUserRegistration function 
    *if we use "use RefreshDatabase" passport won't work, so for more Test is necesary 
    *create a new user in testUserRegistration and use it in the other tests.
    */
     /**
     * Test registration of a new user.
     *
     * @return void
     */
    public function testUserRegistration()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Ethan',
            'email' => 'Ethan@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!'
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'token',
                     'user' => ['id', 'name', 'email']
                 ]);

        $this->assertDatabaseHas('users', [
            'email' => 'Ethan@example.com'
        ]);
    }

    /**
     * Test login functionality.
     *
     * @return void
     */
    public function testUserLogin()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'Ethan@example.com',
            'password' => 'Password123!'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'token',
                     'user' => ['id', 'name', 'email']
                 ]);
    }

    /**
     * Test login with incorrect credentials.
     *
     * @return void
     */
    public function testUserLoginWithIncorrectCredentials()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'Ethan@example.com',
            'password' => 'WrongPassword!'
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'message' => 'Please check your email and password'
                 ]);
    }
}
