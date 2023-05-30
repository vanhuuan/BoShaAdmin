import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import "../css/ChapterNav.css";
import { useNavigate } from "react-router-dom";
import { chapterService } from "../services/chapter.services";

const ChapterNav = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const id = props.chapter.book;
    const chapId = props.chapter.chap;
    const [age, setAge] = useState(id)
    const [next, setNext] = React.useState(chapId);
    const [pre, setPre] = React.useState(chapId)
    const handleChange = (e) => {
        setAge(e.target.value);
    };
    const resultRef = props.resultRef
    const [chapters, setChapters] = React.useState([])
    let navigate = useNavigate()
    const load = async () => {
        console.log(id)
        const rs = await chapterService.chapters(id);
        console.log(rs)
        if (rs.data) {
            setChapters(rs.data)
        }
        for (var i = 0; i < rs.data.length; i++) {

            if (rs.data[i].chapterId === chapId) {
                if (i - 1 >= 0) {
                    setPre(rs.data[i - 1].chapterId)
                }
                if (i + 1 < rs.data.length) {
                    setNext(rs.data[i + 1].chapterId)
                }
            }
        }
        setIsLoading(false)
    }

    const onChange = (chap) => {
        props.parentCallback(chap)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <div class="chapter-nav">
            <Link to={`/book/${id}`} className="chapter-nav__icon">
                <HomeIcon></HomeIcon>
            </Link>
            {pre === chapId ?
                <button className="chapter-nav__page" style={{ backgroundColor: "gray" }}>
                    &#8249;
                </button> : <button className="chapter-nav__page" onClick={(e) => { navigate(`/chapter/${pre}`); onChange(pre)}}>
                    &#8249;
                </button>
                }

            <Select
                onChange={handleChange}
                displayEmpty
                className="chapter-nav__select-item"
                value={chapId}
            >
                {isLoading === false ?
                    chapters.map((item) => (
                        <MenuItem onClick={(e) => { navigate("/chapter/" + item.chapterId); onChange(item.chapterId) }} value={item.chapterId} key={item.chapterId}>
                            {`${item.chapterNumber} - ${item.chapterName}`}
                        </MenuItem>
                    )) : <></>}

            </Select>
            {next === chapId ?
                <button className="chapter-nav__page" style={{ backgroundColor: "gray" }}>
                    &#8250;
                </button> : <button className="chapter-nav__page" onClick={(e) => { navigate(`/chapter/${next}`); onChange(next)}}>
                    &#8250;
                </button>
                }
            <button className="chapter-nav__comment"  onClick={() => {resultRef.current.scrollIntoView({ behavior: "smooth" })}}>
                <ChatBubbleIcon style={{ fontSize: `18px` }}></ChatBubbleIcon>
                <span className="chapter-nav__comment-text">Bình luận</span>
            </button>
        </div >
    );
}

export default ChapterNav;