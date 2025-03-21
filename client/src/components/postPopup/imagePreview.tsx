import EmojiPickerComponent from './emojiPicker/emojiPicker';

function ImagePreview({ openImages, imageInputRef, openImagesHandler, text, user, setText, images, setImages, setShowPrev, setError, textRef, setPicker, picker, backgroundImages, imageHandler }: any) {
  const handleImages = (e: any, backgroundImages?: string[]) => {
    console.log('e', e)
    let files = Array.from(e.target.files);
    files.forEach((img: any) => {
      if (
        img.type !== 'image/jpeg' &&
        img.type !== 'image/png' &&
        img.type !== 'image/webp' &&
        img.type !== 'image/gif'
      ) {
        setError(`${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`);
        files = files.filter((item: any) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item: any) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent: any) => {
          if (backgroundImages !== undefined) {
            setImages(() => [...backgroundImages, readerEvent.target.result]);
            return
          }
          setImages((images: any) => [...images, readerEvent.target.result]);

        };
      }
    });
  };
  return (
    <div className='overflow_a scrollbar'>
      <EmojiPickerComponent
        text={text}
        user={user}
        setPicker={setPicker}
        setText={setText}
        type2
        imageInputRef={imageInputRef}
        textRef={textRef}
        picker={picker}
      />
      <div className='add_pics_wrap'>
        <input
          type='file'
          accept='image/jpeg,image/png,image/webp,image/gif'
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className='add_pics_inside1 p0'>
            <div className='preview_actions'>
              <button className='hover1'>
                <i className='edit_icon'></i>
                Edit
              </button>
              <button
                className='hover1'
                onClick={openImagesHandler}
              >
                <i className='addPhoto_icon'></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className='small_white_circle'
              onClick={() => {
                setImages([]);
              }}
            >
              <i className='exit_icon'></i>
            </div>
            <div
              className={
                images.length === 1
                  ? 'preview1'
                  : images.length === 2
                    ? 'preview2'
                    : images.length === 3
                      ? 'preview3'
                      : images.length === 4
                        ? 'preview4 '
                        : images.length === 5
                          ? 'preview5'
                          : images.length % 2 === 0
                            ? 'preview6'
                            : 'preview6 singular_grid'
              }
            >
              {images.map((img: any, i: number) => (
                <img src={img} key={i} alt='' />
              ))}
            </div>
          </div>
        ) : (
          <div className='add_pics_inside1'>
            <div
              className='small_white_circle'
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className='exit_icon'></i>
            </div>
            <div
              className='add_col'
              onClick={() => { }}
            >
              <div className='add_circle'>
                <i className='addPhoto_icon'></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className='add_pics_inside2'>
          <div className='add_circle'>
            <i className='phone_icon'></i>
          </div>
          <div className='mobile_text'>Add photos from your mobile device.</div>
          <span className='addphone_btn'>Add</span>
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
