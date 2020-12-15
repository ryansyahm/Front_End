import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from "reactstrap";
import { logoutAction } from "../redux/action";

class NavigationBar extends Component {
	state = {
		isOpen: false,
	};
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	// renderDropdown = () => {
	// 	if (this.props.email !== "") {
	// 		return(

	// 		<DropdownMenu right>
	// 			<Link to="/">
	// 				<DropdownItem>Profile</DropdownItem>
	// 			</Link>
	// 			<Link to="/">
	// 				<DropdownItem>Log out</DropdownItem>
	// 			</Link>
	// 			<DropdownItem divider />
	// 		</DropdownMenu>;
	// 		)
	// 	} else {
	// 		return (
	// 		<DropdownMenu right>
	// 			<Link to="/login">
	// 				<DropdownItem>Login</DropdownItem>
	// 			</Link>
	// 			<Link to="/register">
	// 				<DropdownItem>Register</DropdownItem>
	// 			</Link>
	// 			<DropdownItem divider />
	// 		</DropdownMenu>;
	// 		)
	// 	}
	// };

	render() {
		return (
			<div>
				<Navbar
					style={{ backgroundColor: "#138496", color: "white" }}
					dark
					expand="md"
				>
					<Link to="/">
						<NavbarBrand>Yuhuu Store</NavbarBrand>
					</Link>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="mr-auto" navbar>
							<Link to="/products">
								<NavItem>
									<NavLink>Products</NavLink>
								</NavItem>
							</Link>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									User
								</DropdownToggle>
								{/* {this.renderDropdown()} */}
								{this.props.email !== "" ? (
									<DropdownMenu right>
										<Link to="/">
											<DropdownItem>Profile</DropdownItem>
										</Link>
										<Link to="/cart">
											<NavItem>
												<DropdownItem>Cart</DropdownItem>
											</NavItem>
										</Link>
										<Link to="/history-transaction">
											<NavItem>
												<DropdownItem>History</DropdownItem>
											</NavItem>
										</Link>
										<Link to="/manage-product">
											<NavItem>
												<DropdownItem>Manage Products</DropdownItem>
											</NavItem>
										</Link>
										<Link to="/">
											<DropdownItem onClick={this.props.logoutAction}>
												Log Out
											</DropdownItem>
										</Link>
										<DropdownItem divider />
									</DropdownMenu>
								) : (
									<DropdownMenu right>
										<Link to="/login">
											<DropdownItem>Login</DropdownItem>
										</Link>
										<Link to="/register">
											<DropdownItem>Register</DropdownItem>
										</Link>
										<DropdownItem divider />
									</DropdownMenu>
								)}
							</UncontrolledDropdown>
						</Nav>
						{this.props.email ? (
							<NavbarText>{this.props.email}</NavbarText>
						) : null}
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

const mapStatetoProps = ({ user }) => {
	return {
		email: user.email,
	};
};

export default connect(mapStatetoProps, { logoutAction })(NavigationBar);
