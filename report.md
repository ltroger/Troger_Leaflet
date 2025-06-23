## Target User
The target users are commuters in Salzburg, that travel to the city using cars. Whether it be with an electrical vehicle or a car using fossil fuels, it can be interesting to see the disparancy between the data.

## Data Sources
2 Overpass Turbo Queries, one each for gas stations and electrical charging stations.

## Methodology
1. Overpass Turbo queries to get the data for fuel stations and elctrical outlets.
2. The results were fetched as JSON. For each spot, relevant info such as Operator or opening time, were displayed.
3. The data was visualised with coloured dots.
4. Added interactivity by either hovering over an item or pressing on it. ALso toggle in the legend.
5. Colours were chosen, so users with collour-blindness can still tell the difference

## Design choices
This map highlights the disparancy between gas/fuel stations and electrical charging stations. As electrical vehicles get more commonly used, the need for charging stations is ever increasing. This map should also show people where these power stations are located so they can make use of them.

## Analysis
The design is kept simple, with 2 colours that are recognisable, even for people with colour blindness. I chose circles, instead of markers, to make the two values more easily differentiable. The overall map should show the users the locations and make him compare the values with each other, which is why the only information that is shown on mouse hover is the name of the establishment. Should the user want to find out more about the value, he can click on the circle and find out more about it, such as what type of outlet is used or when it is open for business. 

## Potential Improvements
The map could be improved, by displaying the total numbers of gas stations and charging stations, to further highlight the difference between the two. Also, the colors could maybe be adjusted, so they are not confused with the background too much.

## Key Takeaways
The map gives the user a valuable insight into the amount of charging stations, be it elctrical or fossil and tells a story about disparancy between them.