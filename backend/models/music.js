const { fetchMusic } = require("./util/musicApi");

async function init(connection) {
  // fetchMusic을 결정하기 위해 music table이 존재하는지 확인.
  const [rows] = await connection.query(
    "\
    SELECT 1 FROM Information_schema.tables\
    WHERE table_schema = 'mlog'\
    AND table_name = 'music'\
    "
  );
  await connection.execute(
    "\
    CREATE TABLE IF NOT EXISTS mlog.music (\
      id BIGINT NOT NULL,\
      title VARCHAR(60),\
      artist VARCHAR(60),\
      genre VARCHAR(30),\
      img VARCHAR(255),\
      videoId VARCHAR(255),\
      PRIMARY KEY (id)\
    )ENGINE=InnoDB;"
  );
  if (!rows.length) await InsertMusic(connection);
}

// Insert musicData to musicTable.
async function InsertMusic(connection) {
  const response = await fetchMusic();
  let query = "INSERT INTO mlog.music VALUES ";
  response.forEach(({ id, title, artist, genre, img, videoId }) => {
    query += `(${id}, '${title}', '${artist}', '${genre}', '${img}', '${videoId}'),`;
  });
  console.log("music INSERT 중");
  await connection.execute(query.replace(/.$/, ";"));
  console.log("music INSERT 완료");
}

module.exports = {
  init,
};