/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/ 
var createViewModel = require("./main-view-model").createViewModel;

function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = createViewModel();
}

//nativescript map module

var mapsModule = require("nativescript-google-maps-sdk");
 
function onMapReady(args) {
  var mapView = args.object;
 
  console.log("Setting a marker...");
  var marker = new mapsModule.Marker();
  marker.position = mapsModule.Position.positionFromLatLng(-33.86, 151.20);
  marker.title = "Sydney";
  marker.snippet = "Australia";
  marker.userData = { index : 1};
  mapView.addMarker(marker);
}
 
function onMarkerSelect(args) {
   console.log("Clicked on " +args.marker.title);
}
 
function onCameraChanged(args) {
    console.log("Camera changed: " + JSON.stringify(args.camera)); 
}

function onCoordinateTapped(args) {
    console.log("coordinate tapped!");
    var mapView = args.object;
    var marker = new mapsModule.Marker();
    marker.position = mapsModule.Position.positionFromLatLng(args.latitude,args.longitude);
    mapView.addMarker(marker);
    //console.log("Coordinate Tapped at " + JSON.stringify(args.position));
    //console.log("Coordinate Tapped at " + JSON.stringify(args.position.positionFromLatLng));
}

function onCoordinateLongPress(args) {
    //console.log("coordinate long press");
}
 


/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;
exports.onCoordinateTapped = onCoordinateTapped;
exports.onCoordinateLongPress = onCoordinateLongPress;