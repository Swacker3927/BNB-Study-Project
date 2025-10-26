const path = require('path');
const pwUtil = require('../../lib/pwUtil');
const fs = require('fs');

module.exports = async (payload, photo, createdIp) => {
  payload.createdIp = createdIp;
  // 비밀번호 암호화
  payload.password = await pwUtil.hashPassword(payload.password);

  const t = await $DB.sequelize.transaction();
  try {
    // 사용자 정보 DB에 저장
    const user = await $DB.user.create(payload, { transaction: t });
    console.log('userId', user.id);

    // photo 실제 경로에 저장을 한다.
    //TODO: 파일 저장 함수 별도 지정
    const uploadPath = $UPLOAD_PATH + '/member';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const ext = path.extname(photo.originalFilename).toLowerCase();
    const fileName = photo.newFilename + ext;
    fs.writeFileSync(
      path.join(uploadPath, photo.newFilename + ext),  //  목적지
      fs.readFileSync(photo.filepath) //  원본
    );

    // DB 저장 객체
    const filePayload = {
      userId: user.id,
      boardName: 'member',
      type: 'photo',
      fileName: fileName,
      displayName: photo.originalFilename,
      mimeType: photo.mimetype,
      size: photo.size
    };

    const file = await $DB.files.create(filePayload, { transaction: t });

    await t.commit();

    return {
      user,
      file
    };
  } catch (e) {
    await t.rollback();
    throw e;
  }
};
