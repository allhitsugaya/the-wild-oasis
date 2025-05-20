import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from '../../ui/Spinner.jsx';
import { useBooking } from './useBooking.js';
import Menus from '../../ui/Menus.jsx';
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout.js';
import { useDeleteBooking } from './useDeleteBooking.js';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import Modal from '../../ui/Modal.jsx';
import React from 'react';
import Empty from '../../ui/Empty.jsx';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
const navigate = useNavigate();
const {checkout, isCheckingOut}= useCheckout()
  const moveBack = useMoveBack();
  const {deleteBooking, isDeletingBooking} = useDeleteBooking();

  if(isLoading) return <Spinner/>;
if(!booking) return <Empty resource='booking'/>
  const {status,  id: bookingId} = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        { status === 'unconfirmed' && <Button variation="primary" size='large' onClick={() => navigate(`/checkin/${bookingId}`)}>
          Check in
        </Button>}
        { status === 'checked-in' && <Button variation="primary" size='large' icon={<HiArrowUpOnSquare />} disabled={isCheckingOut} onClick={() => checkout(bookingId)}
        >
          Check out
        </Button>}
        <Modal>

          <Modal.Open opens='delete'>
            <Button variation='danger' size='large'>Delete</Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete resourceName='booking' disabled={isDeletingBooking} onConfirm={() => {
              deleteBooking(bookingId, {onSettled: ()=> navigate(-1)});

            }}  />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" size='large' onClick={moveBack}>
          Back
        </Button>

      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
