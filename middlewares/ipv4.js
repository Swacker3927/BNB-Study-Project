function getIpv4(ip) {
	// : 로 나눠서 배열로 만들면 마지막 배열에 IP가 있다.
	const arr = ip.split(':');
	return arr[arr.length - 1];
}

module.exports = async (ctx, next) => {
	//  ctx.ipv4 = ctx.request.headers['x-forwarded-for'] 는 NginX에서 헤더에 넣은 실제 접속 IP
	ctx.ipv4 = ctx.request.headers['x-forwarded-for'] || getIpv4(ctx.ip);
	await next();
};
