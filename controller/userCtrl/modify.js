const pwUtil = require('../../lib/pwUtil');
const fileUtil = require('../../lib/fileUtil');

module.exports = async (email, payload, photo) => {
	// payload.password 있으면 hash를 만든다.
	if (payload.password) {
		payload.password = await pwUtil.hashPassword(payload.password);
	}

	const t = await $DB.sequelize.transaction();
	try {
		// photo 가 있으면
		let userPhoto = null;
		let result = {};

		if (photo) {
			// 먼저 올라간게 있으면 삭제 하고
			userPhoto = await $DB.files.findOne({
				where: { userEmail: email, boardName: 'member', type: 'photo' }
			})

			if (userPhoto) {
				await $DB.files.destroy({ // DB 삭제
					where: { userEmail: email, boardName: 'member', type: 'photo' },
					transaction: t
				})
			}
			// 새로 올린다.
			const filePayload = {
				userEmail: email,
				boardName: 'member',
				type: 'photo',
				...fileUtil.write('/member', photo),
			}

			const newPhoto = await $DB.files.create(filePayload, { transaction: t });
			result.photo = fileUtil.getFileUrl(newPhoto);
			// console.log(result.photo);
		}

		// 유저 정보 
		const cnt = await $DB.user.update(payload, {
			where: {
				email: email,
			},
			transaction: t
		});

		await t.commit();
		fileUtil.remove('/member', userPhoto.fileName); // 실제 파일 삭제
		result.cnt = cnt;
		return result;

	} catch (e) {
		await t.rollback();
		fileUtil.remove('/member', fileUtil.getFileName(photo))
		throw e;
	}

}