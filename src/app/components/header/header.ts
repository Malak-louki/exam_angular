import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'hb-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, Navbar],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})


export class Header {



  protected readonly links = signal([
    {path: '/', name: 'Home'},
    {path: '/register', name: 'Register'},
    {path: '/login', name: 'Login'},
    {path:'/feed', name:'Feed'}
  ]);


}

