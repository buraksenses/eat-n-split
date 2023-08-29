package com.sirhot.EatnSplit.Full.Stack.App.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "friend")
@Data
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "balance")
    private int balance;
}
