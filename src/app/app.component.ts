import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from 'src/service/services.service';
import { Observable } from 'rxjs';
import { DetailedStat, MainStat } from 'src/Models/model'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mainStats: Observable<MainStat>;
  countries : any=null;
  CoutName : string;
  countrydata : string = null;
 

 MainStatsByCountries : any=null;


 constructor(private serv : ServicesService){
   
  }


  ngOnInit(){
    this.serv.getCountries().subscribe((data) => {
      this.countries = data;
    })
    

  }

  getStatbyCountry(){
    this.serv.getMainStatsByCountries(this.CoutName).subscribe(data =>{
      this.MainStatsByCountries = data;
    })
  }


  }
 
    
       
    
  




  


