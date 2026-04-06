// checkRole(['Admin', 'Seller'])

module.exports = (allowRoles) => {
	return async (ctx, next) => {
		try {
			const user = ctx.user;
			if (!user) {
				throw new Error("인증이 필요합니다.")
			}

			if (allowRoles.indexOf(user.role) < 0) {
				throw new Error("권한이 없습니다.")
			}

			await next();
		} catch (e) {
			ctx.body = {
				success: false,
				data: e.message
			}
		}
	}
}