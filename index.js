//animating main page/1st page
var fetchSlider = document.querySelector('.slider');
var fetchMainPicture  = document.querySelector('.MiddlePicture')
var animate = new TimelineMax();
//changes
animate.fromTo(fetchSlider, 1, {x : '0%'}, {x : '-100%', ease : Power2.easeInOut});
animate.fromTo(fetchMainPicture, 0.5, {width : '100%'}, {width : '90%' , ease : Power2.easeInOut});

//UsingAPI
var fetchSearch = document.querySelector('.SearchCountry');
console.log(fetchSearch);
var fetchCountry = document.querySelector('.Country');
var fetchNewConfirmedFigure = document.querySelector('.NewConfirmedFigure');
var fetchTotalConfirmedFigure = document.querySelector('.TotalConfirmedFigure');
var fetchNewDeathsFigure = document.querySelector('.NewDeathsFigure');
var fetchTotalDeathsFigure = document.querySelector('.TotalDeathsFigure');
var fetchNewRecoveredFigure = document.querySelector('.NewRecoveredFigure');
var fetchTotalRecoveredFigure = document.querySelector('.TotalRecoveredFigure');
var fetchSubmit = document.querySelector('.submit');
var NotFoundCountryText = "Sorry! Country Searched not found!";
var FetchMyChart = document.querySelector('.MyChart').getContext("2d");
var FetchGraph = document.querySelector('.GraphColoum');
// console.log(FetchMyChart);

var barChart;
//Naming variable with set for setInterval
var SetMyNewConfirmedCases;
var SetTotalConfirmedCases;
var SetNewDeaths;
var SetTotalDeaths ;
var SetNewRecovered;
var SetTotalRecovered;
var ObjectCountry 
var data;
var totalData;
window.addEventListener('load',  async function()
{
    //Fetching API in event load so that json file get loaded once window is ready
    try{
        var response = await fetch('https://api.covid19api.com/summary');
         data  = await response.json();
         console.log('done');
         var CountryName =  fetchCountry.innerHTML;     // fetching Already Written Pakistan in html 
         CountryDetails(data, CountryName)              //passing data and country to get details
        fetchSubmit.addEventListener('click', function()
        {
            destroyMyGraph();
           var SearchCountryValue =  fetchSearch.value.charAt(0).toUpperCase() + fetchSearch.value.slice(1).toLowerCase();
           if(SearchCountryValue=="")
           {
            
            CountryDetails(data, CountryName); //if nothing is written in the input bar then Pass Pakistan as  Country //Detail
            
            
            }
           else{
                ClearAllInterval(); //clear every timer when sth is searched
                CountryDetails(data, SearchCountryValue)   //else if sth is written in search bar then pass that written
                                        //countryDetails            
           
            }
        });

    }
    catch(error){
        console.log(error.message);
    }
})
function destroyMyGraph()
{
    if(barChart)
    {
        window.barChart.destroy();
        console.log('destroyed');
    }

}
function ClearAllInterval(){
    clearInterval(SetMyNewConfirmedCases);
    clearInterval(SetTotalConfirmedCases);
    clearInterval(SetNewDeaths);
    clearInterval(SetTotalDeaths);
    clearInterval(SetNewRecovered);
    clearInterval(SetTotalRecovered);
}
function CountryDetails(data, CountryName)
{
    //assign values to the country you get
    var ArrayForCountries = data.Countries;
    var FoundCountry = ArrayForCountries.find(element => element.Country == CountryName);
    
    
   if(FoundCountry==null)
   {
       
       ClearHtml(); //to clear all the html
    ChangeCountryText(NotFoundCountryText);

} 

    else{
        ObjectCountry = {
            Country: FoundCountry.Country,
              CountryCode: FoundCountry.CountryCode,
              Slug: FoundCountry.Slug,
              NewConfirmed: FoundCountry.NewConfirmed,
              TotalConfirmed: FoundCountry.TotalConfirmed,
              NewDeaths: FoundCountry.NewDeaths,
              TotalDeaths: FoundCountry.TotalDeaths,
              NewRecovered: FoundCountry.NewRecovered,
              TotalRecovered: FoundCountry.TotalRecovered,
              Date: FoundCountry.Date
        
        }; 
        //function GetYourGraph()
        console.log(ObjectCountry);
        ChangeCountryText(ObjectCountry.Country);
        GetYourGraph();
        ClearHtml(); //to clear al  l the html
        FillHTMLInPosition(ObjectCountry); //after clear fill html in that position
     
    }
   
}


function ChangeCountryText(country)
{
    fetchCountry.innerHTML = country;

}

function ClearHtml()
{

    //To Clear EveryChild node
    fetchNewConfirmedFigure.innerHTML = "0";

    fetchNewDeathsFigure.innerHTML = "0";

    fetchNewRecoveredFigure.innerHTML = "0";
    fetchTotalConfirmedFigure.innerHTML = "0";
    fetchTotalDeathsFigure.innerHTML = "0";
    fetchTotalRecoveredFigure.innerHTML = "0";
    

}
function FillHTMLInPosition(ObjectCountry)
{
        
    // GetYourGraph(ObjectCountry);
       
    //Fill Html in respective positions using counter
        var Counter=  0;
        var CounterForTotalCOnfirmed = 0;
        var CounterForNewDeaths = 0;
        var CounterForTotalDeaths= 0;
        var CounterforNewRecovered = 0;
        var CounterForTotalRecovered= 0;
        SetMyNewConfirmedCases  = setInterval(frames, 25);
        SetTotalConfirmedCases = setInterval(framesForTotalConfirmed,25);
        SetNewDeaths = setInterval(framesForNewDeaths , 25);
        SetTotalDeaths  = setInterval(framesForTotalDeaths,25);
        SetNewRecovered = setInterval(framesForNewRecovered,25);
        SetTotalRecovered = setInterval(framesForTotalRecovered,25);

        console.log(ObjectCountry.NewConfirmed);  
       
        function frames()
        {
            if(Counter!=ObjectCountry.NewConfirmed)
            {
                Counter += 1;
                fetchNewConfirmedFigure.innerHTML = Counter;
            }
            else{
                clearInterval(SetMyNewConfirmedCases)
            }
        }

        function framesForTotalConfirmed(){
            if(CounterForTotalCOnfirmed!=ObjectCountry.TotalConfirmed)
            {
                CounterForTotalCOnfirmed += 1;
                fetchTotalConfirmedFigure.innerHTML = CounterForTotalCOnfirmed;
            }
            else{
                clearInterval(SetTotalConfirmedCases)
            }
       
        }

        function framesForNewDeaths()
        {
            if(CounterForNewDeaths!=ObjectCountry.NewDeaths)
            {
                CounterForNewDeaths += 1;
                fetchNewDeathsFigure.innerHTML = CounterForNewDeaths;
            }
            else{
                clearInterval(SetNewDeaths)
            }

        }
        function framesForTotalDeaths()
        {
            if(CounterForTotalDeaths!=ObjectCountry.TotalDeaths)
            {
                CounterForTotalDeaths += 1;
                fetchTotalDeathsFigure.innerHTML = CounterForTotalDeaths;
            }
            else{
                clearInterval(SetTotalDeaths)
            }

        } 
        function framesForNewRecovered(){
            if(CounterforNewRecovered!=ObjectCountry.NewRecovered)
            {
                CounterforNewRecovered += 1;
                fetchNewRecoveredFigure.innerHTML = CounterforNewRecovered;
            }   
            else{
                clearInterval(SetNewRecovered)
            }
        }
        function framesForTotalRecovered(){
            if(CounterForTotalRecovered!=ObjectCountry.TotalRecovered)
            {
                CounterForTotalRecovered += 1;
                fetchTotalRecoveredFigure.innerHTML = CounterForTotalRecovered;
            }
            else{
                clearInterval(SetTotalRecovered)
            }
        }
    
    }
  

    function GetYourGraph(){
        
        var MyDataForGraph = [ObjectCountry.NewConfirmed,
            ObjectCountry.TotalConfirmed,
        ObjectCountry.NewDeaths,
    ObjectCountry.TotalDeaths,
ObjectCountry.NewRecovered,
ObjectCountry.TotalRecovered];

 barChart = new Chart(FetchMyChart,{
    
        type : 'bar', //type of chart 
        data: {
            labels : ['NewConfirmedCases','TotalConfirmedCases','NewDeaths','TotalDeaths','NewRecovered','TotalRecovered'],
            datasets : [
                {
                    label : `${ObjectCountry.Country}`, 
                    
                    data : MyDataForGraph,
                    backgroundColor : ['yellow','#FF0000', '#F3AB00', '#77C100', '#247EEC', '#EE6F63'],
                    borderWidth : 1,
                    hoverBorderWidth : 2,
                    borderColor : 'white'
                }
            ]
        },
        options : {
            title : {
                display : true,
                text : `${ObjectCountry.Country} chart`,
                fontSize : 35,
                fontColor : 'black',
                position : 'top'
            }, 
            legend : {
                text : 'onratechange',
                display : true,
                fontSize: 13,
                fullWidth : true,
                position : 'right',
                align : 'center',
                labels : {
                    fontColor : 'black'

                },
                fillStyle: "green",


            }, 
            layout : {
                margin : {
                    left : 4,
                    right : 4,
                    
                },
                padding : {
                    top  : 44,
                    bottom : 44
                }
            },
            responsive : true,
            maintainAspectRatio : false            
            

        }

    },
    
    );
   
        };
