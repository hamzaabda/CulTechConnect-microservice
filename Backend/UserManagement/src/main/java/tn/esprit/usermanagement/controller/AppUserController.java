package tn.esprit.usermanagement.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.usermanagement.entities.AppUser;
import tn.esprit.usermanagement.services.AppUserService;

import javax.ws.rs.Path;
import java.util.List;

@RestController
@RequestMapping("/adherant")
@Slf4j
public class AppUserController {


    @Autowired
    private AppUserService appUserService;

    @PostMapping("/CreateUser")
    public ResponseEntity<AppUser> CreateUser(@RequestBody AppUser appUser)
    {
        return new ResponseEntity<>(appUserService.CreateUser(appUser), HttpStatus.OK);
    }

    @GetMapping("/getusers")
    public ResponseEntity<List<AppUser>> getallusers()
    {
        return new ResponseEntity<>(appUserService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/getuserbyemail/{email}")
    public ResponseEntity<AppUser> getuserbyemail(@PathVariable("email")String email)
    {
        return new ResponseEntity<>(appUserService.findAppUserByEmail(email), HttpStatus.OK);
    }

    @PutMapping("/edituser/{userId}")
    public ResponseEntity<AppUser> edituser(@PathVariable("userId")int UserId,@RequestBody AppUser appUser)
    {
        return new ResponseEntity<>(appUserService.UpdateUser(appUser,UserId), HttpStatus.OK);
    }

    @PutMapping("/deleteuserbyid/{idUser}")
    public ResponseEntity<?> edituser(@PathVariable("idUser")int idUser)
    {
        appUserService.removeUser(idUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/getuserbyid/{idUser}")
    public ResponseEntity<AppUser> getUserbyId(@PathVariable("idUser")int idUser)
    {
       return new ResponseEntity<>(appUserService.getUserById(idUser), HttpStatus.OK);
    }


    @GetMapping("/getUserByUsername/{username}")
    public ResponseEntity<AppUser> getUserByUsername(@PathVariable("username") String username)
    {
        return new ResponseEntity<>(appUserService.findAppUserByUsername(username),HttpStatus.OK);
    }
}
