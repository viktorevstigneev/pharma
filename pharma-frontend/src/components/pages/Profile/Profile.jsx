import React, { useEffect, useState, useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import ModalWindow from '../../common/ModalWindow';
import ProfileTaskList from '../../common/ProfileTasksList';
import './style.css';

import { POPUP_OVERLAY_CLASSNAME, API_URL } from '../../../constants';
import ProfileHonorsList from '../../common/ProfileHonorsList/ProfileHonorsList';

const Profile = ({ profile, honors, loadProfileData, loadHonorsData, match }) => {
	const [user, setUser] = useState();
	console.log('user: ', user);
	const [order, setOrder] = useState();

	useEffect(() => {
		loadProfileData(match.params.id);
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};

		getCurrentUser();
	}, [match.params.id]);

	useEffect(() => {
		const getOrder = async () => {
			const responseData = await axios
				.get(`${API_URL}/team`, { withCredentials: true })
				.then((response) => setOrder(response.data));
		};
		getOrder();
	}, []);

	const gotedData =
		order && order.filter((value) => profile.data?.userCart && profile.data?.userCart.includes(value._id));
	console.log('gotedData: ', gotedData);

	const handleOrderPreparats = async () => {
		const responseData = await axios
			.post(`${API_URL}/team/order`, { withCredentials: true, gotedData, user: user.username, userID: user._id })
			.then((response) => response.data);
		console.log('responseData: ', responseData);

		window.location.reload();
		alert('Заказ Отправлен');
	};

	return (
		<Fragment>
			<Header />
			<div className="profile">
				<p className="profile__top">Корзина пользователя {profile.data?.username}</p>
				{gotedData && gotedData.length ? (
					gotedData &&
					gotedData.map((item) => (
						<div className="flex">
							<p className="profile__top"> {item.name}</p>
							<p className="profile__top"> {item.price} BYN</p>
						</div>
					))
				) : (
					<p className="">no items</p>
				)}
				{gotedData && gotedData.length ? (
					<button className="order__prep" onClick={handleOrderPreparats}>
						Заказать препараты
					</button>
				) : null}
			</div>

			<Footer />
		</Fragment>
	);
};

Profile.propTypes = {
	profile: PropTypes.object,
	honors: PropTypes.object,
	loadProfileData: PropTypes.func,
	loadHonorsData: PropTypes.func,
	match: PropTypes.object,
};

Profile.defaultProps = {
	profile: {},
	honors: {},
	loadProfileData: () => {},
	loadHonorsData: () => {},
	match: {},
};

export default Profile;
