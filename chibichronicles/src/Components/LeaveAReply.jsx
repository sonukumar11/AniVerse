

export const LeaveAReply = ({}) => {
    return (
        <form>
            <div class="form-group">
                <label for="exampleFormControlTextarea1" style={{ fontSize: 'larger' , fontWeight: '600'}}>Leave a Reply</label>
                <p style={{ color: 'grey'}}>Your username will be published along with this comment.</p>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary mb-2" style={{marginTop: '1rem'}}>Post Comment</button>
        </form>
    );
};

export default LeaveAReply;