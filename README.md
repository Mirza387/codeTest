  
Video demo of the project can be viewed at the following [link](https://www.dropbox.com/scl/fi/663hzeez36tuxvxoe5er9/demo.mov?rlkey=b1c47z485s03if8gtzdzrrbbx\&dl=0).

**Project Hierarchy**  
I have built a full-stack project using MERN stack, i.e., MongoDB, Express, React, and NodeJS. The files containing essential code parts are as below:

- backend  
  - server.js \-\> contains backend code in NodeJS  
- client  
  - src  
    - App.js \-\> contains frontend code in ReactJS  
    - App.css \-\> contains design layout details of the web page  
    - components  
      - birthsBarChart.js \-\> contains code for displaying the bar chart

**How to run the project**

1. Open terminal   
2. cd to CodeTest/backend  
3. run “node server.js”
4. cd to CodeTest/client
5. run “npm start”
6. The interface will appear in a dark theme by default (which could be switched to light mode).  

**How to view and interact with the results**

1. The buttons to show results in a table or barchart are disabled by default. Select any number of municipalities, years and genders. For a quick selection the option of “Select All” is provided which selects all available options. Once at-least one option from each category (municipalities, years and genders) is selected, the buttons to display table or barchart are enabled.   
2. If the “Show table view” button is clicked all the data appears in a table.  
3. The default order of results in the table is as it is fetched from the server. We can sort the rows in the table alphabetically for municipalities by checking the “Sort municipalities alphabetically” checkbox and the table is sorted.
4. We can also choose to view data individually for one or more options. Try pressing ctrl+mouseClick for Windows or command+mouseClick for Mac to choose more than one option in a single dropdown menu.
5. If the “Show bar chart view” button is clicked all the data appears in a barchart.
6. We can see the barchart for all municipalities as well, however that takes a few seconds to load due to heavy rendering involved.