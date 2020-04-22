import React from 'react';
import { DevButton } from '..';

export const DevEditButton = ({ onExecute, text }) => <DevButton icon="pencil" hint="Редактировать" color="dark" text={text} onExecute={onExecute} />;