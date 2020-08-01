import React from "react";

class UserData extends React.Component {

  render() {
		const user = this.props.user;
		if (!user.hasOwnProperty("description")) {
			return <p>Этот пользователь не имеет полных данных</p>
		}

    return (
      <>
        <p>
          Выбран пользователь <b>{`${user.firstName} ${user.lastName}`}</b>
        </p>
        <p>Описание:</p>
        <textarea value={user.description} disabled></textarea>
        <p>
          Адрес проживания: <b>{user.address.streetAddress}</b>
        </p>
        <p>
          Город: <b>{user.address.city}</b>
        </p>
        <p>
          Провинция/штат: <b>{user.address.state}</b>
        </p>
        <p>
          Индекс: <b>{user.address.zip}</b>
        </p>
      </>
    );
  }
}

export default UserData;
