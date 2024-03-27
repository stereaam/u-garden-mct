import React from "react";
import Header from "../../components/header/Header";
function Help() {
	return (
		<div>
			<Header />
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div style={{ width: "90%", marginTop: "50px", textAlign: "justify" }}>
					<h4>
						U-Garden Multi Criteria Tool is a web platform whose main objective
						is to facilitate decision making in the location of urban gardens.
						The application is designed to be an interactive and easy-to-use
						tool that allows any stakeholder or local actor (from public
						administrations to associations) to upload their own data, group the
						variables of interest by dimensions, weight them according to their
						own criteria and obtain a visual result. This result will allow
						users to quickly identify the empty plots that best suit their needs
						and interests for the implementation of an urban garden. In short,
						the application seeks to democratise the process of locating urban
						gardens by providing a platform that allows users to make informed
						decisions based on a set of variables and criteria defined by
						themselves.
					</h4>
					<div>
						<h1>Functionalities</h1>
						<h2>Home Menu</h2>
						<div>
							The "Home" menu is the starting point for users and contains
							options related to the general configuration of the application
							and common tasks:
							<ul>
								<li> Data import</li>
								<li>Language selection</li>
								<li>Project management</li>
							</ul>
						</div>
						<h2>View menu</h2>
						<div>
							The "View" menu contains options to customise the display of the
							data:
							<ul>
								<li>
									Base map selection: An option to select the source of the base
									map representation (OpenStreetMap, Stamen, CartoDB, etc.).
								</li>
								<li>
									Layer control: Options to select which data layers are
									displayed on the map.
								</li>
								<li>
									Zoom and navigation: Options to zoom in, zoom out and navigate
									the map.
								</li>
							</ul>
						</div>
						<h2>Tools menu</h2>
						<div>
							The Tools menu contains various tools for data analysis and
							manipulation:
							<ul>
								<li>
									Variable assignment: An option to assign imported variables to
									different dimensions, invert their direction [1 – x] or delete
									them.
								</li>
								<li>
									Filters and search: Tools to filter the data and search for
									specific observations (plots).
								</li>
								<li>
									Data analysis: Tools to standardise data, manipulate data or
									visualise data.
								</li>
							</ul>
						</div>
						<h2>Help menu</h2>
						<div>
							The Help menu provides help and guidance to users:
							<ul>
								<li>
									Tutorials: Step-by-step guides to help users understand how to
									use the application.
								</li>
								<li>
									Frequently Asked Questions (FAQs): Answers to the most common
									questions users may have about the application.
								</li>
								<li>
									Customer Support: Contact information for additional help if
									needed.
								</li>
							</ul>
						</div>
						<br></br>
						<br></br>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Help;
