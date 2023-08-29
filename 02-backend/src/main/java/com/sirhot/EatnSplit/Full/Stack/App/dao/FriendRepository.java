package com.sirhot.EatnSplit.Full.Stack.App.dao;

import com.sirhot.EatnSplit.Full.Stack.App.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend,Long> {
}
