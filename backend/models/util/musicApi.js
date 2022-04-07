const axios = require("axios");

const genreId = {
  ballad: 3550,
  pop: 3556,
  foreignPop: 3559,
  dance: 3551,
  foreignDance: 3562,
  rnb: 3553,
  foreignRnb: 3561,
  hiphop: 3552,
  foreignHiphop: 3560,
  trot: 3554,
  ost: 3565,
  classic: 3566,
};

// Fetch musicList By Genre using Flo Api.
async function fetchMusic() {
  const musicListBaseURL =
    "https://www.music-flo.com/api/display/v1/browser/chart/genre/track/list?size=100";
  const musicListPromiseAll = [];
  let musicListByGenre = [];
  let videoIdList = [];
  const result = [];

  // 병렬처리를 위해 장르별 axios객체 생성.
  for (const key in genreId) {
    const musicListURL = musicListBaseURL.replace("genre", genreId[key]);
    musicListPromiseAll.push(
      axios.create({
        baseURL: musicListURL,
      })
    );
  }
  console.log("musicListByGenre 불러오는 중");
  // 병렬처리 후 musicListByGenre 반환.
  musicListByGenre = await Promise.all(Array.from(musicListPromiseAll, (v) => v.get()));
  console.log("musicListByGenre 완료");

  // 모든 음악의 videoId 불러오기.
  console.log("musicVideoId 불러오는 중");
  let i = 0;
  for (const key in genreId) {
    const videoIdPromiseAll = [];
    for (const music of musicListByGenre[i].data.data.trackList) {
      let videoIdURL = `https://www.googleapis.com/youtube/v3/search?key=${
        process.env.YOUTUBE_KEY
      }&q=${encodeURI(music.name)}${encodeURI(
        " " + music.artistList[0].name
      )}&maxResults=1&part=snippet`;

      // 병렬처리를 위해 장르별 axios객체 생성.
      videoIdPromiseAll.push(
        axios.create({
          baseURL: videoIdURL,
        })
      );
    }
    // 병렬처리 후 videoIdList 반환.
    videoIdList = await Promise.all(Array.from(videoIdPromiseAll, (v) => v.get()));

    // INSERT를 위한 데이터 정리.
    for (let j = 0; j < videoIdList.length; j++) {
      result.push({
        id: musicListByGenre[i].data.data.trackList[j].id,
        title: musicListByGenre[i].data.data.trackList[j].name.replaceAll("'", "\\'"),
        artist: musicListByGenre[i].data.data.trackList[j].artistList[0].name.replaceAll(
          "'",
          "\\'"
        ),
        genre: key,
        img: musicListByGenre[i].data.data.trackList[j].album.imgList[0].url.replaceAll(
          "'",
          "\\'"
        ),
        videoId: videoIdList[j].data.items[0].id.videoId,
      });
    }
    i++;
  }
  console.log("musicVideoId 완료");
  return result;
}

module.exports = {
  fetchMusic,
};
