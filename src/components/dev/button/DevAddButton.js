import React from 'react';
import { DevButton } from '..';

export const DevAddButton = ({ onExecute, text }) => <DevButton icon="plus" hint="Новая запись" color="dark" text={text} onExecute={onExecute} />;