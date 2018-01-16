import React from "react";
import MediaQuery from "react-responsive";

import ChipInput from "material-ui-chip-input";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import FileInput from "../components/FileInput";
import DateTime from "../components/DateTime";

const Form = props => {
	return (
		<form onSubmit={props.methods.sendTweet} encType="multipart/form-data">
			<TextField
				hintText="Type your post here!"
				multiLine={true}
				onChange={props.methods.handleTweetChange}
				value={props.content.tweet}
				name="tweet"
				fullWidth={true}
			/>
			<ChipInput
				hintText="Type a tag, and press enter to add it!"
				// onChange={props.methods.handleTagsChange}
				value={props.content.tags.map(item => item.text.split(" ").join(""))}
				onRequestAdd={chip => props.methods.handleAddChip(chip)}
				onRequestDelete={chip => props.methods.handleDeleteChip(chip)}
				name="tags"
				fullWidth={true}
			/>
			<MediaQuery minWidth={850}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<div>
						<RaisedButton label="Autotag" onClick={props.methods.autoTag} />
						<RaisedButton label="Autogif" onClick={props.methods.autoGif} />
						<div>
							<FileInput
								accept="image/*"
								value={props.content.media}
								onChange={props.methods.handleMediaChange}
							/>
						</div>
					</div>
					<DateTime
						date={props.content.date}
						time={props.content.time}
						timeStamp={props.content.timeStamp}
						handleDateChange={props.methods.handleDateChangeExt}
						handleTimeChange={props.methods.handleTimeChangeExt}
					/>
					<div>
						<RaisedButton
							label="Schedule"
							onClick={props.postMethods.scheduleTweet}
						/>
						<RaisedButton
							style={{ borderLeft: "1px solid white" }}
							label="Post"
							onClick={props.postMethods.sendTweet}
						/>
					</div>
				</div>
			</MediaQuery>
			<MediaQuery maxWidth={850}>
				<DateTime
					date={props.content.date}
					time={props.content.time}
					timeStamp={props.content.timeStamp}
					handleDateChange={props.methods.handleDateChangeExt}
					handleTimeChange={props.methods.handleTimeChangeExt}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around"
					}}
				>
					<div>
						<RaisedButton label="Autotag" onClick={props.methods.autoTag} />
					</div>
					<div>
						<RaisedButton label="Autogif" onClick={props.methods.autoGif} />
					</div>
					<div>
						<FileInput
							accept="image/*"
							value={props.content.media}
							onChange={props.methods.handleMediaChange}
						/>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around"
					}}
				>
					<div>
						<RaisedButton
							style={{ marginTop: "1px" }}
							label="Schedule"
							onClick={props.postMethods.scheduleTweet}
						/>
					</div>
					<div>
						<RaisedButton
							style={{ marginTop: "1px" }}
							label="Post"
							onClick={props.postMethods.sendTweet}
						/>
					</div>
				</div>
			</MediaQuery>

			<div id="media">
				{props.content.media &&
					props.content.media.url && <img src={props.content.media.url} />}
			</div>
		</form>
	);
};

export default Form;
