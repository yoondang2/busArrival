// request와 cheerio 모듈을 변수에 불러온다
let request = require('request');
let cheerio = require('cheerio');

//REST API 경로
//serviceKey=키값&stationId=정류소ID
//메뉴얼에 나와있는 REST API 경로
const $url = 'http://openapi.gbis.go.kr/ws/rest/busarrivalservice/station';
//발급 받은 API키
const $KEY = 'ys85epgc3aIhGwrx0GgX54OwbAsIYp3CNUKMM%2BmnfCH7S8W4zgD8vxpH9fr4xwwmrNI2%2BgcKZgfTvnu3vNIhxQ%3D%3D';
//조회할 정류소 ID
const $station = '233001450';

//REST API 요청 형식에 맞춰서 키값과 정류소 ID를 조합
const $api_url = $url + '?serviceKey=' + $KEY + '&stationId=' + $station;

console.log($api_url);

//해당 URL로 요청
request($api_url, function(err, res, body){
   $ = cheerio.load(body);

   //busArrivalList태그로 구분하여 데이터를 나눈 후 하나하나씩 돌며
   //no1, no2 변수에 도착할 버스의 차량 번호를 추출.
   //차량번호는 plateNo1, plateNo2태그 안에 저장되어있음.
   $('busArrivalList').each(function(idx){
       let no1 = $(this).find('plateNo1').text();
       let no2 = $(this).find('plateNo2').text();
       let no3 = $(this).find('predictTime1').text();
       let no4 = $(this).find('predictTime2').text();
       console.log(`도착 예정 버스: ${no1}, ${no3}분 뒤 도착합니다. 다음 도착 버스: ${no2 ? no2 : '---'}. ${no4}분 뒤 도착합니다.`);
                     // ` 백틱 문자
   });

});

