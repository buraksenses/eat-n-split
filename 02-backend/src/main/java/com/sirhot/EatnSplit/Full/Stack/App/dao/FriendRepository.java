package com.sirhot.EatnSplit.Full.Stack.App.dao;

import com.sirhot.EatnSplit.Full.Stack.App.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface FriendRepository extends JpaRepository<Friend,Long> {

}
