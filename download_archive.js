const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const urls = [
  "https://niengineeringbd.com/wp-content/uploads/2017/11/Company_Profile.pdf",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/ni_logo-1.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/fav.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/logo-wh.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/fire-safty-banner-mod-1.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/mr-fire-safety-limited-fire-safety-training-shrewsbury-banner.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/static1.squarespace.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/Access-Control-Systems-1.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/DFRS_Generic_Hero_Banner_78_May13.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/wfs_banner_5-1-1.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/fire-suppression-system.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/fire-detection-alarm-system.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/Alarm-Bell.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/g2.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/AccessControlSystems.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/fire-extinguishers1.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/banner-3.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/f07ad86b1cdc81186961d997363e87a7.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/safty_big.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/firehose.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/fire-hydrant-system.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/BIT-Building-copy.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/brac-university.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/brac-centre-inn-copy.jpg",
  "https://niengineeringbd.com/wp-content/uploads/2017/05/2-pozharogasiteli.png",
  // Logos
  "https://niengineeringbd.com/wp-content/uploads/2017/11/radiant.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/bti.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/brac.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/bracuni.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/global.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/envoy.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/chunghua.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/afl.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/seek.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/gis.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/markup.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/mikey.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/excelent.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/mondol.png",
  "https://niengineeringbd.com/wp-content/uploads/2017/11/hq.png"
];

function downloadFile(fileUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(fileUrl);
    const relativePath = parsedUrl.pathname; // /wp-content/uploads/...
    const localPath = path.join(__dirname, 'archive', relativePath);
    const dir = path.dirname(localPath);

    fs.mkdirSync(dir, { recursive: true });

    const client = parsedUrl.protocol === 'https:' ? https : http;
    client.get(fileUrl, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        console.error(`Failed ${fileUrl}: Status ${response.statusCode}`);
        return resolve(false);
      }
      const fileStream = fs.createWriteStream(localPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${relativePath}`);
        resolve(true);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${fileUrl}: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Starting archive downloads...');
  for (const u of urls) {
    await downloadFile(u);
  }
  console.log('Archive download complete.');
}

run();
