import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import "../css/ListChapter.css";
import { chapterService } from '../services/chapter.services';
import { useNavigate } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from 'react';
import { FlashOnOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';

export default function ListChapter(props) {
  const [checked, setChecked] = React.useState([0]);
  const [chapters, setChapters] = React.useState([])
  const [canEdit, setCanEdit] = React.useState(false)
  const [canBuyed, setBuyed] = React.useState(false)
  const [showMore, setShowMore] = useState(false)

  let navigate = useNavigate()
  const load = async () => {
    console.log(props.book.id)
    console.log("canedit", props.book.canEdit)
    setBuyed(props.book.canBuyed)
    setCanEdit(props.book.canEdit)
    console.log(props.book.canBuyed)
    const rs = await chapterService.chapters(props.book.id);
    console.log(rs)
    if (rs) {
      setChapters(rs.data)
      if (rs.data.length > 10) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    }
  }

  const moment = require('moment');
  moment.updateLocale('vi', {
    relativeTime: {
      future: "%s",
      past: "%s giây trước",
      s: function (number, withoutSuffix, key, isFuture) {
        return (number < 10 ? '0' : '')
          + number + ' phút trước';
      },
      m: "01:00 phút trước",
      mm: function (number, withoutSuffix, key, isFuture) {
        return (number < 10 ? '0' : '')
          + number + ' phút trước';
      },
      h: "một giờ trước",
      hh: "%d giờ trước",
      d: "một ngày trước",
      dd: "%d ngày trước",
      M: "một tháng trước",
      MM: "%d tháng trước",
      y: "một năm trước",
      yy: "%d năm trước"
    }
  });


  React.useEffect(() => {
    load()
  }, [])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {showMore === true ?
        chapters.slice(0, 10).map((value) => {
          const labelId = `checkbox-list-label-${value.chapterNumber}`;
          const date1 = new Date(value.updateDate);
          let a = moment().from(date1);
          return (
            <ListItem
              key={value}
              secondaryAction={
                <div style={{ display: "flex" }}>
                  <ListItemText primary={a} sx={{ marginLeft: "0.5em" }} />
                  {
                    canEdit === true ? <IconButton color='primary' onClick={(e) => {
                      e.preventDefault();
                      var data = {
                        bookId: props.book.id,
                        chapterId: value.chapterId
                      }
                      navigate(`/chapter/updateChapter`, { state: data })
                    }}> <BorderColorIcon /> </IconButton> : <> {
                      canBuyed || value.isDemo ? <></> : <LockPersonIcon></LockPersonIcon>
                    }</>
                  }
                </div>
              }
              disablePadding
              className='chapter-item'

            >
              <ListItemButton className='list_Item_Button' role={undefined} dense onClick={(e) => { if (canBuyed || value.isDemo || canEdit) navigate(`/chapter/${value.chapterId}`) }}>
                <ListItemText id={labelId} primary={`${value.chapterNumber} - ${value.chapterName}`} />
              </ListItemButton>
            </ListItem>
          );
        })
        :
        chapters.map((value) => {
          const labelId = `checkbox-list-label-${value.chapterNumber}`;
          const date1 = new Date(value.updateDate);
          let a = moment().from(date1);
          return (
            <ListItem
              key={value}
              secondaryAction={
                <div style={{ display: "flex" }}>
                  {
                    canBuyed || value.isDemo || canEdit ? <></> : <LockPersonIcon></LockPersonIcon>
                  }
                  <ListItemText primary={a} sx={{ marginLeft: "0.5em" }} />
                  {
                    canEdit === true ? <IconButton color='primary' onClick={(e) => {
                      e.preventDefault();
                      var data = {
                        bookId: props.book.id,
                        chapterId: value.chapterId
                      }
                      navigate(`/chapter/updateChapter`, { state: data })
                    }}> <BorderColorIcon /> </IconButton> : <></>
                  }
                </div>
              }
              disablePadding
              className='chapter-item'
            >
              <ListItemButton className='list_Item_Button' role={undefined} dense onClick={(e) => { if (canBuyed || value.isDemo || canEdit) navigate(`/chapter/${value.chapterId}`) }}>
                <ListItemText id={labelId} primary={`${value.chapterNumber} - ${value.chapterName}`} />
              </ListItemButton>
            </ListItem>
          );
        })
      }
      {chapters.length < 10 ? <></> :
        <Typography textAlign={"center"} mt={"1em"} onClick={() => { setShowMore(!showMore)}}> { showMore === false ? "Bớt": "Xem thêm" }</Typography>
      }
    </List>
  );
}