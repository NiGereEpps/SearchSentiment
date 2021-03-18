var ls = window.localStorage;

document.head.insertAdjacentHTML("beforeend",
`<style>
#overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 2;
  cursor: pointer;
}

#text{
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
}
</style>`)

var overlay = document.createElement("div")
overlay.id = "overlay"
var text = document.createElement("div")
text.id = "text"
text.innerHTML = "Gathering Results For Sentiment Analysis"
overlay.appendChild(text)


if (ls.getItem('Search') == null) {

    var input = document.querySelector('.gLFyf').value

    ls.setItem('Input', input)

    document.querySelector('[aria-label="Page 3"]').click();

    ls.setItem('Search', 1)

} else if (ls.getItem('Search') == 1) {

    document.querySelector('.main').appendChild(overlay);

    setTimeout(function() {

        var results = [];

        document.querySelectorAll('.IsZvec').forEach(res => {

            results.push(res.innerText);

        });

        ls.setItem('Result1', results);

        ls.setItem('Search', 2);

        white = 'white '.concat(ls.getItem('Input'))

        document.querySelector('.gLFyf').value = white

        document.querySelector('[aria-label="Google Search"]').click()

    }, 1000);

} else if (ls.getItem('Search') == 2) {

    document.querySelector('.main').appendChild(overlay);

    document.querySelector('[aria-label="Page 3"]').click();

    ls.setItem('Search', 3)


} else if (ls.getItem('Search') == 3) {

    setTimeout(function() {

        document.querySelector('.main').appendChild(overlay);

        var results = [];

        document.querySelectorAll('.IsZvec').forEach(res => {

            results.push(res.innerText);

        });

        ls.setItem('Result2', results);

        ls.setItem('Search', 4);

        black = 'black '.concat(ls.getItem('Input'))

        document.querySelector('.gLFyf').value = black

        document.querySelector('[aria-label="Google Search"]').click()

    }, 1000);

} else if (ls.getItem('Search') == 4) {

    document.querySelector('.main').appendChild(overlay);

    document.querySelector('[aria-label="Page 3"]').click();

    ls.setItem('Search', 5)

} else if (ls.getItem('Search') == 5) {

    setTimeout(function() {

        document.querySelector('.main').appendChild(overlay);

        var results = [];

        document.querySelectorAll('.IsZvec').forEach(res => {

            results.push(res.innerText);

        });

        ls.setItem('Result3', results);

        ls.setItem('Search', 6);

        input = ls.getItem('Input')

        document.querySelector('.gLFyf').value = input

        document.querySelector('[aria-label="Google Search"]').click()

    }, 1000);

} else {

    document.querySelector('.main').appendChild(overlay);

    setTimeout(function() {

        var Sentiment = require('sentiment');
        var sentiment = new Sentiment();

        document.querySelector('.main').remove();

        document.head.insertAdjacentHTML("beforeend", `<style>
          .column {
            float: left;
            width: 28%;
            padding-right: 5%
          }

          .row{
              margin-left: 180px;
              width: 80%;
              padding-top: 80px;
          }

          .row:after {
            content: "";
            display: table;
            clear: both;
          }

          h1 {
            font-size: 2em;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            color: #1a0dab;
          }

          li {
            padding-top: 20px;
          }
        </style>`)

        input = ls.getItem('Input')
        white = "white ".concat(input)
        black = "black ".concat(input)

        var row = document.createElement("div");
        row.className = "row"

        var div1 = document.createElement("div")
        div1.className = "column"
        var h11 = document.createElement('H1');
        h11.innerHTML = input
        var h21 = document.createElement('H3');
        h21.innerHTML = "Average Sentiment Score: 0"
        div1.appendChild(h11)
        div1.appendChild(h21)

        var div2 = document.createElement("div")
        div2.className = "column"
        var h12 = document.createElement('H1');
        h12.innerHTML = white
        var h22 = document.createElement('H3');
        h22.innerHTML = "Average Sentiment Score: 0"
        div2.appendChild(h12)
        div2.appendChild(h22)

        var div3 = document.createElement("div")
        div3.className = "column"
        var h13 = document.createElement('H1');
        h13.innerHTML = black
        var h23 = document.createElement('H3');
        h23.innerHTML = "Average Sentiment Score: 0"
        div3.appendChild(h13)
        div3.appendChild(h23)

        document.body.appendChild(row);


        //---------------------------------------------------------------------

        let ul = document.createElement('ul');
        div1.appendChild(ul);

        r1scores = []

        var result1 = ls.getItem('Result1').split('.,')

        result1.forEach(function(item) {
            let li = document.createElement('li');
            ul.appendChild(li);
            score = sentiment.analyze(item).score
            r1scores.push(score)
            output = item.concat('<br />Score = ' + score) 
            li.innerHTML += output;
        });

        var r1sum = r1scores.reduce((a, b) => a + b, 0);
        var r1avg = (r1sum / r1scores.length) || 0;
        r1avg = Math.round((r1avg + Number.EPSILON) * 100) / 100

        h21.innerHTML = "Average Sentiment Score: " + r1avg

        //---------------------------------------------------------------------

        let ul2 = document.createElement('ul');
        div2.appendChild(ul2);

        r2scores = []

        var result2 = ls.getItem('Result2').split('.,')

        result2.forEach(function(item) {
            let li = document.createElement('li');
            ul2.appendChild(li);
            score = sentiment.analyze(item).score
            r2scores.push(score)
            output = item.concat('<br />Score = ' + score) 
            li.innerHTML += output;
        });

        var r2sum = r2scores.reduce((a, b) => a + b, 0);
        var r2avg = (r2sum / r2scores.length) || 0;
        r2avg = Math.round((r2avg + Number.EPSILON) * 100) / 100

        h22.innerHTML = "Average Sentiment Score: " + r2avg

        //---------------------------------------------------------------------

        let ul3 = document.createElement('ul');
        div3.appendChild(ul3);

        r3scores = []

        var result3 = ls.getItem('Result3').split('.,')

        result3.forEach(function(item) {
            let li = document.createElement('li');
            ul3.appendChild(li);
            score = sentiment.analyze(item).score
            r3scores.push(score)
            output = item.concat('<br />Score = ' + score) 
            li.innerHTML += output;
        });

        var r3sum = r3scores.reduce((a, b) => a + b, 0);
        var r3avg = (r3sum / r3scores.length) || 0;
        r3avg = Math.round((r3avg + Number.EPSILON) * 100) / 100


        h23.innerHTML = "Average Sentiment Score: " + r3avg

        row.appendChild(div1)
        row.appendChild(div2)
        row.appendChild(div3)

        ls.clear();
       
    }, 1000);
}