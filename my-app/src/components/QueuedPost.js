import React from "react";

import Card from "material-ui/Card";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVert from "material-ui/svg-icons/navigation/more-vert";

const QueuedPost = props => {
	return (
		<Card className="card" style={{ textAlign: "left", zIndex: 10 }}>
			<h4>{props.body}</h4>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between"
				}}
			>
				<p>
					Scheduled for: {props.time.getHours()}:{props.time.getMinutes()} -{" "}
					{props.time.getDate()}/{props.time.getMonth() + 1}/{props.time.getFullYear()}
				</p>
				<IconMenu
					iconButtonElement={
						<IconButton>
							<MoreVert />
						</IconButton>
					}
					anchorOrigin={{ horizontal: "left", vertical: "top" }}
					targetOrigin={{ horizontal: "left", vertical: "top" }}
				>
					<MenuItem primaryText="Post Now" />
					<MenuItem primaryText="Re-schedule" />
					<MenuItem primaryText="Delete Post" />
				</IconMenu>
			</div>
		</Card>
	);
};

export default QueuedPost;
