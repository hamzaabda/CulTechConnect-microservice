package tn.esprit.Chat.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Storage {

    public static Set<ActiveUser> activeUserList = new HashSet<>();

    public static void removeBySession(String session)
    {
        for(ActiveUser activeUser : activeUserList)
        {
            if(activeUser.getSession().equals(session))
            {
                activeUserList.remove(activeUser);
                break;
            }

        }
    }




}
