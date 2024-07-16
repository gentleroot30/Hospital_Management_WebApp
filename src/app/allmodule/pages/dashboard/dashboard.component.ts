import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexLegend, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';


//Date Range Picker Imports
import * as $ from "jquery";
import * as moment from 'moment';
import 'daterangepicker';
import { ToastrService } from 'ngx-toastr';
import { config } from 'rxjs';
import { DashboardService } from '../../services/api_services/dashboard.service';

//line chart graph
declare var google:any;
interface PieDataElement {
  productName: string;
  totalBill: number;
  quantity: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  

  
  chartDataType1 = 4
  chartDataType = 4
  //dateRange1: string | undefined;

  
startDate = '02-02-2024'
endDate : any
 


  // Datepicker 
  ngAfterViewInit(): void {
    // $('input[name="daterange"]').daterangepicker({
    //   startDate: moment().subtract(29, 'days'),
    //   endDate: moment(),
    //   opens: 'left',
      
    //   ranges: {
    //     'Today': [moment(), moment()],
    //     'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //     'Last 3 Months': [moment().subtract(3, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    //     'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    //     'Last 1 Year': [moment().subtract(1, 'year').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    //   }
    // }, function(start, end, label) {
    //   sendchartDataType(label)
    //   console.log(label);
    // });

    
  }

 totalpurchase=0;
 totalSales=0;
 totalexpenditure=0;
 totalSalesDue = 0 ;
 totalPurchaseDue = 0 ;

 chartData : any ;
 pieData: PieDataElement[] = []

 chartSeries: ApexNonAxisChartSeries = [];
 chartLabels: string[] = [];



 legend:ApexLegend={
  position:'bottom',
  horizontalAlign:'center'
 }
 chartDetails: ApexChart = {
  type: 'pie',
  width:'100%',
  toolbar: {
    show: true,
    tools: {
      download: false,
    },
  }
};
  



  chartTitle: ApexTitleSubtitle = {
    align: 'center'
  };

  chartDataLabels: ApexDataLabels = {
    enabled: false
  };
  
  
  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService,
   
  ) { 

    
    
  
    // Load Google Charts library
google.charts.load('current', { packages: ['corechart'] });

// Set a callback function to run when the Google Charts library is loaded
google.charts.setOnLoadCallback(() => {
  // Your chart-drawing logic here
  this.drawSaleAndPurchaseChart(this.chartDataType);
});

    
  }

  ngOnInit(): void {

    // $('input[name="daterange1"]').daterangepicker({
    //   startDate: moment().subtract(29, 'days'),
    //   endDate: moment(),
    //   opens: 'left',
      
      
    //   ranges: {
    //     'Today': [moment(), moment()],
    //     'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //     'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //     'Last 3 Months': [moment().subtract(3, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    //     'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    //     'Last 1 Year': [moment().subtract(1, 'year').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    //   }
      
    // },function(start, end, label){
    //   sendchartDataType1(label)
    //   //drawPieChart(DashboardComponent.chartDataType1)
    //   console.log(label);
      
      
    // });
    

  this.loadDashboardData()

  this.drawPieChart(this.chartDataType1)

  
  

   
  }


  dateRanges = [{value: 1, viewValue: 'Last 1 years'},
  {value: 2, viewValue: 'Last 6 months'},
  {value: 3, viewValue: 'Last 3 months'},
  {value: 4, viewValue: 'Last 30 day'},
  {value: 5, viewValue: 'Yesterday'},
  {value: 6, viewValue: 'Today'},];

  

  loadDashboardData(){

    this.dashboardService.getDashboardData().subscribe({
      next: (res) => {
        if (res.data.length == 0) {
          this.toastr.error("Internal Server Error.")
          return res.status
        } else {
  
          console.log("Dashboard Data:",res.data);
  
          this.totalpurchase = Number(res.data.totalPurchase.toFixed(2));
          this.totalSales = Number(res.data.totalSales.toFixed(2));
          this.totalexpenditure = Number(res.data.totalExpense.toFixed(2));
          this.totalSalesDue = Number(res.data.totalSalesDue.toFixed(2));
          this.totalPurchaseDue = Number(res.data.totalPurchaseDue.toFixed(2));
  
          
          return res.status;
        }
      },
      error: (error) => {
        //alert("something went wrong");
        this.toastr.error('something went wrong');
      },
     })
  }


drawSaleAndPurchaseChart(chartDataType: number) {
  console.log("in drawChart");
  
  this.dashboardService.getSalesAndPurchases(chartDataType).subscribe({
    next: (res) => {
       console.log('API Response:', res);
        console.log('Sales and Purchases Chart Data:', res.data.salesAndPurchasesChartData);
      if (res.data.length === 0) {
        this.toastr.error("Internal Server Error.");
      } else {
        this.chartData = res.data.salesAndPurchasesChartData;
        console.log("length :" , this.chartData.length);
        

        // Convert the data to a format suitable for Google Charts
        var chartArray = [['Year', 'Sales', 'Purchase']];
        this.chartData.forEach((entry: { year: string; totalSales: string; totalPurchase: string; }) => {
          chartArray.push([entry.year, entry.totalSales, entry.totalPurchase]);
        });


        console.log("Chart DATA : ", chartArray);
        var data = google.visualization.arrayToDataTable(chartArray);


        var options = {
          curveType: 'function',
          legend: { position: 'bottom' },
        };
        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        chart.draw(data, options);
      }
    },
    error: (error) => {
      this.toastr.error('Something went wrong');
    },
  });
}


drawPieChart(chartDataType1: number): void{

  console.log("Inside drawPiechart");
  
  this.dashboardService.getSalesBytProductData(chartDataType1).subscribe({
    next: (res) => {
       console.log('API Response:', res);
      console.log('Sales and Purchases Chart Data:', res.data.salesAndPurchasesChartData);
      if (!res.data.salesAndPurchasesChartData) {
        this.toastr.error("Product Not Found")
      } else {

        this.chartSeries = [];
        this.chartLabels = [];
        console.log("Piechart Data:", res.data.salesAndPurchasesChartData);

       var thisData = res.data.salesAndPurchasesChartData;
        this.pieData = res.data.salesAndPurchasesChartData;
        var newchartLabels: string[] = []; // Initialize as an empty array
        var colors = ['#ff0000', '#00ff00', '#0000ff']; // Define colors for each slice


         thisData.forEach((element: PieDataElement, index: number) => {
          this.chartSeries.push(element.totalBill);
          newchartLabels.push(element.productName);
          console.log("Color for", element.productName, ":", this.getSliceColor(element.productName));
          // this.chartColors.push({ backgroundColor: colors[index % colors.length] }); // Assign color based on index


          
        });
        
         
        
         this.chartLabels = newchartLabels;
         console.log("chartLabels", this.chartLabels);  
         console.log("chartSeries", this.chartSeries);
        
        
      }
    },
    error: (error) => {
      this.toastr.error('something went wrong');
    },
  });
}
getSliceColor(productName: string): string {
  switch (productName) {
    case '22':
      return '#ff0000'; // Red
    case 'new':
      return '#00ff00'; // Green
    case 'pp':
      return '#0000ff'; // Blue
    default:
      return '#000000'; // Black (default color)
  }
}

  // return colorMap[productName] || '#000000'; // Default to black if color is not found



// onStaticVariableChange1(): void {
//   debugger
//   this.drawPieChart(DashboardComponent.chartDataType1)
//   console.log("in change");
  
// }

// onStaticVariableChange(): void {
  
//   this.drawSaleAndPurchaseChart(DashboardComponent.chartDataType)
//   console.log("in change");
  
// }


}
  


// const sendchartDataType1 = (label: string | null) => {


//   if (label === "Today") {
    
//     DashboardComponent.chartDataType1 = 6;
//     //console.log(DashboardComponent.chartDataType1);
    

//   } else if (label === "Yesterday") {
    
//     DashboardComponent.chartDataType1 = 5;

//   }
//   else if (label === "Last 30 Days") {
    
//     DashboardComponent.chartDataType1 = 4;

//   }
//   else if (label === "Last 3 Months") {
    
//     DashboardComponent.chartDataType1 = 3;

//   }
//   else if (label === "Last 6 Months") {
    
//     DashboardComponent.chartDataType1 = 2;

//   }
//   else if (label === "Last 1 Year") {
    
//     DashboardComponent.chartDataType1 = 1;

//   }
//   // Add other conditions as needed
// }

// const sendchartDataType = (label: string | null) => {


//   if (label === "Today") {
    
//     DashboardComponent.chartDataType = 6;
//     //console.log(DashboardComponent.chartDataType1);
    

//   } else if (label === "Yesterday") {
    
//     DashboardComponent.chartDataType = 5;

//   }
//   else if (label === "Last 30 Days") {
    
//     DashboardComponent.chartDataType = 4;

//   }
//   else if (label === "Last 3 Months") {
    
//     DashboardComponent.chartDataType = 3;

//   }
//   else if (label === "Last 6 Months") {
    
//     DashboardComponent.chartDataType = 2;

//   }
//   else if (label === "Last 1 Year") {
    
//     DashboardComponent.chartDataType = 1;

//   }
//   // Add other conditions as needed
// }
