import styled from "styled-components";
import Table from '../../ui/Table.jsx'
import {formatCurrency} from '../../utils/helpers.js'
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
import React, { useState } from 'react';
import CreateCabinForm from './CreateCabinForm.jsx';
import { useDeleteCabin } from './useDeleteCabin.js';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin.js';
import Modal from '../../ui/Modal.jsx';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import Menus from '../../ui/Menus.jsx';


function CabinRow({cabin}) {
  const { id: cabinID , name, image, maxCapasity , regularPrice, discount, description } = cabin;
const { isDeleting, deleteCabin } = useDeleteCabin();
const {isLoading, createCabin} = useCreateCabin();

function handleDuplicate() {
  createCabin({
    name: `Copy of ${name}`,
    maxCapasity,
    regularPrice,
    discount,
    description,
    image
  });
}

  return (
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapasity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount?  <Discount>{formatCurrency(discount)}</Discount> : <span>-</span>}
        <div>
          <Modal>

            <Menus.Menu>
              <Menus.Toggle id={cabinID}/>

              <Menus.List id={cabinID}>
                <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack/>}>Duplicate</Menus.Button>
                <Modal.Open opens='edit'>
                  <Menus.Button icon={<HiPencil />}>edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens='delete'>
                  <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name='edit'>
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name='delete'>
                <ConfirmDelete resourceName='cabin' disabled={isDeleting} onConfirm={() => deleteCabin(cabinID)}  />
              </Modal.Window>
            </Menus.Menu>
            </Modal>
        </div>
      </Table.Row>
  );
}

export default CabinRow;
