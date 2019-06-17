# About:
Modular Arithmetic visualization tool. using only POSITIVE integers

this site requires javascript to animate the hands, php and ajax to handle form requests

theres the ability for users to select the animation speed and smoothness to three different settings

clicking the clock also resets it


# Config Vars:
switch the formurl variable in Modular.js any custom url

index.php file redirects to Modular.html

# Other:
customizable defaults are within the top of the Modular.js file

the picture file for the clock background is in the #clock selector css background property

formurl: the customizable url

radius: radius to match the circle background

clocknumbers: the amount of numbers on the clock

timeout: time it takes to perform animation

smoothness: how smooth the animation is (divides distance into multiple steps)

DIVIDEND_MAX: maximum dividend number
DIVISOR_MAX: maximum divisor number, low numbers on the clock to prevent crowding

ENUM used to identify each container, they can be any three different numbers
CONTAINER_SECONDS = 700;
CONTAINER_MINUTES = 701;
CONTAINER_HOURS = 702;

References:

Clock css:
https://cssanimation.rocks/clocks/

Dropdown buttons:
https://www.w3schools.com/Css/css_dropdowns.asp


