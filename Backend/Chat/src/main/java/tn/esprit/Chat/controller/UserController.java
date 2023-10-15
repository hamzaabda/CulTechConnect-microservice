package tn.esprit.Chat.Controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.Chat.model.ActiveUser;
import tn.esprit.Chat.model.Storage;

import java.util.List;
import java.util.Set;

@RestController
public class UserController {
    @CrossOrigin("http://localhost:4300/")
    @GetMapping("/activeUsers")
    Set<ActiveUser> list()
    {
        return Storage.activeUserList;
    }
}
