import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";


export interface indetail {
  TrackingNumber: any;
  StatusDescription: any;
  DateOfShipment: any;
  Pieces: any;
  Weight: any;
  PickupCityName: any;
  PickupStateProvID: any;
  PickupCountryID: any;
  PickupCountryName: any;
  DeliveryCityName: any;
  DeliveryStateProvID: any;
  DeliveryCountryID: any;
  DeliveryCountryName: any;
  StepName: any;
  Itinerary: any

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'sachintha';
  datamax: any = null;
  arrynew: any[] = [];
  IsComplete: any[] = [];
  StepDescription: any[] = [];
  CompletedUTC: any[] = [];
  CompletedLocal:any[]=[]


  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }


  indetails: indetail;
  trackid: any = "1011650"

  // -- loacl var 

  lTrackid: any;
  lStatusDescription: any;
  lDateOfShipment: any;
  lPieces: any;
  lWeight: any;
  lPickupCityName: any;
  lPickupStateProvID: any;
  lPickupCountryID: any;
  lPickupCountryName: any;
  lDeliveryCityName: any;
  lDeliveryStateProvID: any;
  lDeliveryCountryID: any;
  lDeliveryCountryName: any;
  lStepName: any;
  lItinerary: any;

  id: any

  gettrackid() {


    if (this.trackid == null) {

      // alert("plase enter your Tracking ID");
      Swal.fire({
        title: 'Plase enter your Tracking ID!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Close'
      })
      return;

    } else {

      this.spinner.show();

      // 1011650

      // var url = 'https://cors-anywhere.herokuapp.com/https://webapi-shipper.shipsameday.com/api/Track/15782/' + this.trackid + '?fbclid=IwAR2i9xYH6_w79hVBRBtvWMTbeGSIZmqdB8dC21DAbJYqWiIuHJRjCSMb1_I'

      let body = new HttpParams({
        fromObject: {

          'trackid': this.trackid,
        }
      });

      var url = 'http://colombolive.com/curl/agent.php?fbclid=IwAR23B32YpuRn1iY6oHsgQY9vIsWYzmUVpgw4rEDpBhbgVlIJ37aTqkoN7RQ'
      console.log(this.trackid);
      this.http.post<any>(url, body)
        .subscribe(data => {
          this.indetails = data;
          this.lTrackid = this.indetails.TrackingNumber;
          this.lStatusDescription = this.indetails.StatusDescription;
          this.lDateOfShipment = this.indetails.DateOfShipment;
          this.lPieces = this.indetails.Pieces;
          this.lWeight = this.indetails.Weight;
          this.lPickupCityName = this.indetails.PickupCityName;
          this.lPickupStateProvID = this.indetails.PickupCountryID;
          this.lPickupCountryID = this.indetails.PickupCountryID;
          this.lPickupCountryName = this.indetails.PickupCountryName;
          this.lDeliveryCityName = this.indetails.DeliveryCityName;
          this.lDeliveryStateProvID = this.indetails.DeliveryStateProvID;
          this.lDeliveryCountryID = this.indetails.DeliveryCountryID;
          this.lDeliveryCountryName = this.indetails.DeliveryCountryName;
          this.lItinerary = this.indetails.Itinerary;
          this.lStepName = this.indetails.StepName;

          this.arrynew = [] // clan arry
          this.IsComplete = []
          this.StepDescription = []
          this.CompletedUTC = []
          this.CompletedLocal = []



          // console.log( this.lItinerary);




          let i = -1;

          while (i < 4) {

            i++;

            this.arrynew.push(this.lItinerary[i].StepName)
            this.IsComplete.push(this.lItinerary[i].IsComplete)
            this.StepDescription.push(this.lItinerary[i].StepDescription)
            this.CompletedUTC.push(this.lItinerary[i].CompletedUTC)
            this.CompletedLocal.push(this.lItinerary[i].CompletedLocal)

            console.log(this.arrynew)

            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 2000);
          }

          // console.log(this.arrynew)

        });

    }



  }

}
