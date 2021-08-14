const model = require('../../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.get_join = (req, res, next) => {
	return res.render('join.pug', {
		pageTitle: 'join'
	});
};

exports.post_join = async (req, res, next) => {
	const { email, password, passwordConfirm, nickname } = req.body;
	try {
		const existEmail = await model.User.findOne({ where: { email } });
		if (existEmail) {
			return res.send('<script>alert("이미 존재하는 이메일 입니다.");</script>');
		}
		const existNickName = await model.User.findOne({ where: { nickname } });
		if (existNickName) {
			return res.send('<script>alert("이미 존재하는 닉네임입니다.");</script>');
		}
		if (password !== passwordConfirm) {
			return res.send('<script>alert("비밀번호가 틀렸습니다. 다시 입력해주세요.");</script>');
		} else {
			const hash = await bcrypt.hash(password, await bcrypt.genSalt(12));
			// TODO: 프로필이미지 관계 걸고 회원가입할 떄 프로필사진 등록하던지 회원가입할때는 기본이미지만 주고 프로필수정하기에서 바꾸게 하기
			const user = await model.User.create({
				email,
				nickname,
				password: hash
			});
			// user는 로그인 이메일칸에 들어갈 예정
			return res.send('<script>alert("회원가입에 성공하였습니다.");location.href="/auth/login";</script>');
		}
	} catch (e) {
		return next(e);
	}
};

exports.get_login = (req, res, next) => {
	return res.render('login.pug', {
		pageTitle: 'login'
	});
};

exports.post_login = async (req, res, next) => {
	// 로그인 성공시 메인 페이지로 이동
	passport.authenticate('local', (authError, user, info) => {
		if (authError) {
			console.error(authError);
			return next(authError);
		}
		if (!user) {
			return res.send(`<script>alert(${info.message});location.href="#";</script>`);
		}
		return req.login(user, (loginError) => {
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}
			return res.redirect('/post');
		});
	})(req, res, next);
};

exports.get_logout = async (req, res, next) => {
	req.logout();
	return res.redirect('/auth/login');
};
